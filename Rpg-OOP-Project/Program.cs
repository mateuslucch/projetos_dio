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

            Knight knight = new Knight("Arus", 12, "Knight", 25, 100);
            Wizard wizard = new Wizard("Jennica", 23, "White Wizard", 20, 100);
            heroesList.Add(knight);
            heroesList.Add(wizard);

            Boss theDemon = new Boss("Shadow Killoran", 99, "Boss", 35, 500);
            enemiesList.Add(theDemon);

            Console.Clear();
            Console.WriteLine($@"        Welcome to the epic battle!");

            Console.WriteLine("");
            Console.Write($@"            Known the heroes:            ");
            foreach (Characters hero in heroesList)
            {
                Console.WriteLine($@"
                Name: {hero.Name}  Class: {hero.CharacterType} HP:{hero.Life} Damage:{hero.HitPoints}");
            }

            Console.WriteLine("");
            Console.Write($@"            Known the enemies:            ");
            foreach (Characters enemie in enemiesList)
            {
                Console.WriteLine($@"
                Name: {enemie.Name}  Class: {enemie.CharacterType} HP:{enemie.Life} Damage:{enemie.HitPoints}");
            }

            Console.WriteLine("Press enter to see the most epic battle in the world!");
            ConsoleEnter("");

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

                Console.Write($@"
            {knight.Name} life:     {knight.Life}
            {wizard.Name} life:     {wizard.Life}
            {theDemon.Name} life:   {theDemon.Life}
            ");

                Console.WriteLine("");

                // check lifes individually so enemies (or heroes) stop attacking the dead ones
                // note: to use a reserved word as a variable, put the @ in front
                foreach (Characters character in heroesList)
                {
                    if (character.isDead == true)
                    {
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine($"Hero {character.Name} is dead.");
                        Console.ResetColor();
                    }
                }

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

        // sort and return one target index from a character list
        private static Characters ChooseTarget(List<Characters> chars)
        {
            int targetIndex;
            while (true)
            {
                targetIndex = 0;
                if (chars.Count > 1)
                {
                    Random rndNumber = new Random();
                    targetIndex = rndNumber.Next(chars.Count);
                    if (!chars[targetIndex].isDead)
                    {
                        break;
                    }
                }
                else { break; }
            }
            return chars[targetIndex];
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