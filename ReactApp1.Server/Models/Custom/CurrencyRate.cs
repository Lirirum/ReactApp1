namespace ReactApp1.Server.Models.Custom
{
    public class CurrencyRate
    {
  
        public DateTime Date { get; set; }
        public string From { get; set; }
        public string To { get; set; }  

        public decimal Amount { get; set; }

        public decimal Value { get; set; }


    }

}
