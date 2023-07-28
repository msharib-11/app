trigger OminTrigger on Case (After insert) {
    if(trigger.isAfter && trigger.isinsert){
        SkillBasedRoutingApexHours.routingCasesToAgents(trigger.new);
    }
}