namespace RpgProject
{
    internal class Program
    {
        static void Main(string[] args)
        {
            bool battle = true;
            int turns = 1;

            List<Characters> heroesList = new List<Characters>();
            List<Characters> enemiesList = new List<Characters>();


            // heroes and enemies instantiate
            Knight knight = new Knight("Arus", 12, "Knight", 25, 100);
            heroesList.Add(knight);
            Wizard wizard1 = new Wizard("Jennica1", 23, "White Wizard", 20, 100);
            heroesList.Add(wizard1);
            Wizard wizard2 = new Wizard("Jennica2", 23, "White Wizard", 20, 100);
            heroesList.Add(wizard2);
            Wizard wizard3 = new Wizard("Jennica3", 23, "White Wizard", 20, 100);
            heroesList.Add(wizard3);

            Boss theDemon = new Boss("Shadow Killoran", 99, "Boss", 35, 500);
            enemiesList.Add(theDemon);
            Wizard enemyWizard1 = new Wizard("Spourtes1", 11, "Warlock", 15, 90);
            enemiesList.Add(enemyWizard1);
            Wizard enemyWizard2 = new Wizard("Spourtes2", 11, "Warlock", 15, 90);
            enemiesList.Add(enemyWizard2);
            Wizard enemyWizard3 = new Wizard("Spourtes3", 11, "Warlock", 15, 90);
            enemiesList.Add(enemyWizard3);


            Console.Clear();
            Console.WriteLine($@"        WELCOME TO THE EPIC BATTLE!");

            Console.WriteLine("");
            // heroes list
            Console.Write($@"            Known the heroes:            ");
            foreach (Characters hero in heroesList)
            {
                Console.WriteLine($@"
                Name: {hero.Name}  Class: {hero.CharacterType} HP:{hero.Life} Damage:{hero.HitPoints}");
            }

            Console.WriteLine("");
            // enemies list
            Console.Write($@"            Known the enemies:            ");
            foreach (Characters enemie in enemiesList)
            {
                Console.WriteLine($@"
                Name: {enemie.Name}  Class: {enemie.CharacterType} HP:{enemie.Life} Damage:{enemie.HitPoints}");
            }

            Console.WriteLine("Press enter to see the most epic battle in the world!");
            ConsoleEnter("");

            // BATTLE START
            while (battle)
            {
                Console.Clear();
                Console.WriteLine("");
                string ordinal;
                if (turns <= 3) { ordinal = Enum.GetName(typeof(Ordinal), turns); }
                else { ordinal = Enum.GetName(typeof(Ordinal), 4); }

                Console.ForegroundColor = ConsoleColor.Blue;
                Console.WriteLine(
        $@"
        {turns}{ordinal} turn!
                ");
                Console.ResetColor();

                Console.WriteLine("");

                // heroes attack
                Console.WriteLine(@"
            The heroes are attacking!");
                Console.ForegroundColor = ConsoleColor.Green;
                Attack(heroesList, enemiesList);
                Console.ResetColor();

                Console.WriteLine("");

                // enemies attack
                Console.WriteLine(@"
            The enemies are attacking!");
                Console.ForegroundColor = ConsoleColor.Green;
                Attack(enemiesList, heroesList);
                Console.ResetColor();

                Console.WriteLine("");
                Console.WriteLine("Heroes Lifes");
                ShowHp(heroesList);
                Console.WriteLine("Enemies Lifes");
                ShowHp(enemiesList);

                Console.WriteLine("");

                // check lifes individually so enemies (or heroes) stop attacking the dead ones
                // note: to use a reserved word as a variable, put the @ in front
                ShowDeads(heroesList);
                ShowDeads(enemiesList);

                Console.WriteLine("");

                // check if all heroes are dead
                if (CheckAllDead(heroesList))
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("All heroes are dead. Best luck next time!");
                    Console.ResetColor();

                    ConsoleEnter("Press enter to end program.");
                    battle = false;
                }
                // check if all enemies are dead
                else if (CheckAllDead(enemiesList))
                {
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine("All enemies are dead. Congratulations heroes!");
                    Console.ResetColor();

                    ConsoleEnter("Press enter to end program.");
                    battle = false;
                }
                else { ConsoleEnter($"Press enter for the next turn."); }
                turns++;
            }
        }

        private static void ShowHp(List<Characters> charactersList)
        {
            foreach (Characters @char in charactersList)
            {
                Console.WriteLine($@"Name: {@char.Name} HP:{@char.Life}");
            }
        }

        private static void ShowDeads(List<Characters> charactersList)
        {
            foreach (Characters character in charactersList)
            {
                if (character.isDead == true)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"{character.Name} is dead.");
                    Console.ResetColor();
                }
            }
        }

        // foreach attackers, check if attacker is not dead and attack
        private static void Attack(List<Characters> attackers, List<Characters> targets)
        {
            foreach (Characters @char in attackers)
            {
                if (!@char.isDead)
                {
                    Console.WriteLine(@char.Attack(ChooseTarget(targets)));
                }
            }
        }

        // sort and return one target (not dead) object from a character list
        private static Characters ChooseTarget(List<Characters> target)
        {
            int targetIndex;
            targetIndex = 0;
            // check if all possible targets are dead (infinite lop without this)
            if (CheckAllDead(target)) { return null; }
            else
            {
                if (target.Count > 1)
                {
                    while (true)
                    {
                        Random rndNumber = new Random();
                        targetIndex = rndNumber.Next(target.Count);

                        if (!target[targetIndex].isDead) { break; }
                    }
                }
            }
            return target[targetIndex];
        }

        // returns true if all characters on list are dead
        private static bool CheckAllDead(List<Characters> characters)
        {
            int listDeads = 0;

            foreach (Characters character in characters)
            {
                if (character.isDead == true)
                {
                    listDeads++;
                }
            }
            if (listDeads == characters.Count()) { return true; }
            return false;
        }

        // console check for enter key
        private static void ConsoleEnter(string message)
        {
            while (true)
            {
                Console.WriteLine($"{message}");
                if (Console.ReadLine() == "") { break; }
            }
        }
    }
}