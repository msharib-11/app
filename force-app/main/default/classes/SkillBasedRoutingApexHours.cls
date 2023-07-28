public class SkillBasedRoutingApexHours { 
    @InvocableMethod
    public static void routingCasesToAgents(List<case> cases){
        //Create PSR
        //Add skills to the request for the case
        //Push it to queue
        List<id> caseIds = new List<id>();
        for(case cs : cases){
            caseIds.add(cs.id);
        }
        List<Case> casesInserted = [SELECT id,subject from Case where ID IN: caseIds];
        LIst<Skill> allSkills = [SELECT id,MasterLabel from Skill];
       
        for(Case caseR : casesInserted){
            PendingServiceRouting psr= new PendingServiceRouting();
            psr.workItemId = caseR.Id;
            psr.RoutingType = 'SkillsBased';
            psr.RoutingPriority = 1;
            psr.CapacityWeight = 1;
            psr.ServiceChannelId = '0N92w000000cx4cCAA'; //Use your own Service Channel ID
            psr.RoutingModel = 'MostAvailable';
            psr.IsReadyForRouting = FALSE; //DRAFT state
            Insert psr; //First Step is completed
           
            //Find Out The Skills Required for a fiven Case based on its Subject
            List<String> matchingSkillIds = new List<String>();
            for(Skill skillR: allSkills){
                if(caseR.Subject.contains(skillR.MasterLabel)){
                    matchingSkillIds.add(skillR.Id);
                }
            }
           
            List<SkillRequirement> skillToInsert = new List<SkillRequirement>();
            //Associate matching skills with PSR request
            for(String matchingSkillId: matchingSkillIds){
                SkillRequirement skillReq = new SkillRequirement();
                skillReq.SkillId = matchingSkillId;
                skillReq.RelatedRecordId = psr.id;
                skillReq.SkillLevel = 5;
                skillToInsert.add(skillReq);
            }
            Insert skillToInsert;
           
            //Push our request in to the queue
            psr.IsReadyForRouting = TRUE;
            Update PSR;
        }
    }
}