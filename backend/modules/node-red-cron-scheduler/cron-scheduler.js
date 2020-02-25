module.exports = function (RED) {
    "use strict";
    var schedule = require('node-schedule');

    function CronScheduler(n) {

        function createSchedule(node, nodeSchedule) {
            if(!nodeSchedule) return;

            if(node.scheduler) {
                node.scheduler.cancel();
            }
            

            try {
                node.scheduler = schedule.scheduleJob(nodeSchedule, function() {
                    node.send({});
                });
            } catch (err) {
                node.error(RED._(err));
            }




            node.status({fill:"green",shape:"dot",text:"scheduled"});
        }

        function cancelSchedule(node) {
            if(node.scheduler) {
                node.scheduler.cancel();
            }

            node.status({fill:"red",shape:"dot",text:"no schedule"});
        }

        function parseNodeSchedule(nodeSchedule) {
            if(!nodeSchedule) return;

            try {
                return JSON.parse(nodeSchedule);
            } catch(err) {
                // gulp
            }

            return nodeSchedule;
        }

        RED.nodes.createNode(this, n);

        this.schedule = parseNodeSchedule(n.schedule);

        var node = this;

        node.status({fill:"red",shape:"dot",text:"no schedule"});

        createSchedule(node, node.schedule);

        node.on('input', function (msg) {
            var inputSchedule = msg.payload.schedule ?  msg.payload.schedule : this.schedule;
            var cancelScheduleFlag = msg.payload.cancel;

            if(cancelScheduleFlag) {
                cancelSchedule(node);
                return;
            }

            createSchedule(node, inputSchedule);
        }.bind(this));

        node.on('close', function () {
            cancelSchedule(node);
        }.bind(this));
    }

RED.nodes.registerType("cron scheduler", CronScheduler);
};