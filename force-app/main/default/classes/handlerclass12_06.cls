public class handlerclass12_06 {
    public static void oppl(List <opportunity> opplist){
        List <case> csList = new List <case>();
        for(opportunity op: opplist){
            if(op.stageName == 'closed Lost'){
                case cs = new case();
                cs.AccountId = op.AccountId;
                cs.ContactId = op.ContactId;
                cs.Status = 'new';
                cs.Origin = 'web';
                csList.add(cs);
        	}
        }
        insert csList;
    }
}