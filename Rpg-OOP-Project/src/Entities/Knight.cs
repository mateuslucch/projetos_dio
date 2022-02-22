namespace RpgProject
{
    public class Knight : Characters
    {
        public Knight(string Name, int Level, string CharacterType, int Damage, int Life)
        {
            this.Name = Name;
            this.Level = Level;
            this.CharacterType = CharacterType;
            this.HitPoints = Damage;
            this.Life = Life;                        
        }

        public Knight(Characters target)
        {
            this.Target = target;
        }

        public override string Attack(Characters target)
        {
            if (target == null) { return $"{this.Name} will not attack. All possible targets are dead!"; }
            target.TakeDamage(HitPoints);
            return 
    $@"{this.Name} the {this.CharacterType} charged {target.Name} with sword!";
        }
    }
}