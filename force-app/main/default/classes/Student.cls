public virtual class Student extends Person {
	Public integer studentId;
    
    public void student1(string s, date d, integer sId){
        name = s;
        dateOfBirth = d;
        studentId = sId;
    }
    
    public void showoff(){
        system.debug(this.name + ' ' + this.dateOfBirth + ' having Id ' + this.studentId);
    }
}