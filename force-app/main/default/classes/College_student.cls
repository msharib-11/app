public class College_student extends Student {
	Public string collegeName;
    Public integer year;
    
    public void student1(string name, date d, integer sId, string c, integer y){
        this.name = name;
        dateOfBirth = d;
        studentId = sId;
        collegeName = c;
        year = y;
    }
    
    public void showAll(){
        system.debug(this.name + ' DOB: ' + this.dateOfBirth + ' Id: ' + this.studentId + ' College Name : ' + this.collegeName + ' year ' + year);
    }
} 


/*
public class MyClass {
    private integer var1 = 10;
    public void fun1(){
        integer var1 = 15;
        system.debug('Local value');
        system.debug(var1);
        system.debug('class variable');
        system.debug(this.var1);
    }
}
*/