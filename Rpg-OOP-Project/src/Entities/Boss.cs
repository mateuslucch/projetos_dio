namespace RpgProject
{
    public class Boss : Characters
    {
        public Boss(string Name, int Level, string CharacterType, int HitPoints, int Life)
        {
            this.Name = Name;
            this.Level = Level;
            this.CharacterType = CharacterType;
            this.HitPoints = HitPoints;
            this.Life = Life;
        }

        public Boss(Characters target)
        {
            this.Target = target;
        }

        public override string Attack(Characters target)
        {
            // sort number, see if boss hit target
            Random rndNumber = new Random();
            int hitChance = rndNumber.Next(10);

            if (hitChance > 5)
            {
                target.TakeDamage(HitPoints);
                return
    $@" 
    {this.Name} the {this.CharacterType} hit {target.Name}! 
    {target.Name} took {this.HitPoints} points of damage";
            }
            else
            {
                return
    $@" 
    {this.Name} the {this.CharacterType} attacked, 
    but missed the target...";
            }

        }
    }
}