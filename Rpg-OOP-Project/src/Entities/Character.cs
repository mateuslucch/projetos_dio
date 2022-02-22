namespace RpgProject
{
    public class Characters
    {
        public Characters(string Name, int Level, string CharacterType, int HitPoints, int Life, Characters target)
        {
            this.Name = Name;
            this.Level = Level;
            this.CharacterType = CharacterType;
            this.HitPoints = HitPoints;
            this.Life = Life;
            this.Target = target;
        }

        public Characters() { }

        public bool isDead = false;
        public Characters Target;
        public string Name = "";
        public int Level;
        public string CharacterType = "";
        public int HitPoints;
        public int Life;

        public int getLife() { return this.Life; }
        public bool getIsDead() { return isDead; }

        public override string ToString()
        {
            return this.Name + " " + this.Level + " " + this.CharacterType;
        }

        public virtual string Attack(Characters target)  // virtual allow override over this method
        {
            if (target == null) { return "All targets are dead!"; }
            target.TakeDamage(HitPoints);
            return $" {this.Name} attacked!";
        }

        public void TakeDamage(int damageTaken)
        {
            this.Life -= damageTaken;
            if (this.Life <= 0)
            {
                this.Life = 0;
                isDead = true;
            }
        }

    }
}