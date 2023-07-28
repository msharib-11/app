public class Teacher extends Person{
    Public integer salary;
    Public string subject;
    
    Public void setValues(string n, date d, integer s, string sub){
       name = n;
       dateOfBirth = d;
       salary = s;
       subject = sub;
    }
    public void show(){
        system.debug(this.name + ' DOB ' + this.dateOfBirth + 'salary'  + this.salary + ' Having Subject ' + this.subject);
    }
}