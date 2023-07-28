@isTest
public class TestTemperature_Converter {
    @isTest static void testwarmTemp(){
        decimal c = temperature_Converter.to_celsius(70);
        system.assertEquals(21.11, c);
    }
}