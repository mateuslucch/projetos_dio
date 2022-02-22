namespace RpgProject
{
    public class Wizard : Characters
    {
        public Wizard(string Name, int Level, string CharacterType, int Damage, int Life)
        {
            this.Name = Name;
            this.Level = Level;
            this.CharacterType = CharacterType;
            this.HitPoints = Damage;
            this.Life = Life;
        }

        public Wizard(Characters target)
        {
            this.Target = target;
        }

        public override string Attack(Characters target)
        {
            target.TakeDamage(HitPoints);
            return 
    $@" 
    {this.Name} the {this.CharacterType} cast a spell!";
        }
    }
}