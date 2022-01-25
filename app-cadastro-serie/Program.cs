namespace DIO.Series
{
    internal class Program
    {
        static SerieRepositorio repositorio = new SerieRepositorio();

        static void Main(string[] args)
        {
            string opcaoUsuario = ObterOpcaoUsuario();

            while (opcaoUsuario.ToUpper() != "X")
            {
                switch (opcaoUsuario)
                {
                    case "1":
                        ListarSeries();
                        break;
                    case "2":
                        InserirSerie();
                        break;
                    case "3":
                        AtualizarSerie();
                        break;
                    case "4":
                        VisualizarSerie(-1);
                        break;
                    case "5":
                        ExcluirSerie();
                        break;
                    case "C":
                    case "c":
                        Console.Clear();
                        break;

                    default:
                        ImprimirTexto("Opção não existente!", ConsoleColor.Black, ConsoleColor.Red);
                        break;
                }

                opcaoUsuario = ObterOpcaoUsuario();
            }
            Console.WriteLine("Obrigado por utilizar nossos serviços.");
            Console.ReadLine();
        }

        private static void ExcluirSerie()
        {
            int indiceSerie = 0;

            while (true)
            {
                ImprimirTexto("Digite o id da série, ou \"sair\" para voltar ao menu inicial: ", ConsoleColor.Black, ConsoleColor.Red);
                string? valorEntrada = Console.ReadLine();

                if (valorEntrada == "sair") { return; }

                if (int.TryParse(valorEntrada, out int value))
                {
                    indiceSerie = int.Parse(valorEntrada);
                    if (indiceSerie < 0 || indiceSerie >= repositorio.Lista().Count)
                    {
                        ImprimirTexto($"Indice invalido!", ConsoleColor.Black, ConsoleColor.Red);
                    }
                    else
                    {
                        while (true)
                        {
                            ImprimirTexto($"A série de índice {indiceSerie} será excluida. Você quer continuar(S/N)?",
                               ConsoleColor.Black,
                               ConsoleColor.Red);

                            string? confirmação = Console.ReadLine();
                            if (confirmação == "S" || confirmação == "s")
                            {
                                repositorio.Exclui(indiceSerie);
                                Console.Clear();
                                ImprimirTexto($"Série excluida!!", ConsoleColor.Black, ConsoleColor.Red);
                                return;
                            }
                            else if (confirmação == "N" || confirmação == "n") { break; }
                            else
                            {
                                ImprimirTexto($"Valor inválido. Digite S(sim) ou N(não)", ConsoleColor.Black, ConsoleColor.Red);
                            }
                        }
                    }
                }
                else { System.Console.WriteLine("Valor entrada invalido!"); }
            }
        }

        private static void VisualizarSerie(int indice)
        {
            Console.Clear();
            int indiceSerie;
            string? entradaValor = "";
            while (true)
            {
                if (indice == -1)
                {
                    Console.WriteLine("\nDigite o id da série, ou \"sair\" para voltar ao menu principal: ");
                    entradaValor = Console.ReadLine();
                }
                else
                {
                    indiceSerie = indice;
                    Console.WriteLine("Dados atuais da série: ");
                    break;
                }

                if (entradaValor == "sair") { return; }

                if (!int.TryParse(entradaValor, out int value))
                {
                    ImprimirTexto($"Valor digitado deve ser um numero!", ConsoleColor.Black, ConsoleColor.Red);
                }
                else
                {
                    indiceSerie = int.Parse(entradaValor);
                    if (indiceSerie < 0 || indiceSerie >= repositorio.Lista().Count)
                    {
                        ImprimirTexto($"Indice invalido!", ConsoleColor.Black, ConsoleColor.Red);
                    }
                    else { break; }
                }
            }

            var serie = repositorio.RetornaPorId(indiceSerie);
            Console.BackgroundColor = ConsoleColor.Blue;
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine(serie);
            Console.ResetColor();

        }

        private static void AtualizarSerie()
        {
            int indiceSerie;

            while (true)
            {
                Console.Write("Digite o id da série a ser atualizada, ou \"sair\" para voltar ao menu: ");
                string? valorEntrada = Console.ReadLine();

                if (valorEntrada == "sair") { return; }

                // checar se valor é int
                if (int.TryParse(valorEntrada, out int value))
                {
                    indiceSerie = int.Parse(valorEntrada);

                    // checar se indice existe                    
                    if (indiceSerie < 0 || indiceSerie > repositorio.Lista().Count - 1)
                    {
                        ImprimirTexto($"Indice invalido!", ConsoleColor.Black, ConsoleColor.Red);
                    }
                    else
                    {
                        ImprimirTexto($"Valores Atuais", ConsoleColor.Black, ConsoleColor.Blue);
                        VisualizarSerie(indiceSerie);
                        break;
                    }
                }
                else { ImprimirTexto($"Valor digitado deve ser um numero!", ConsoleColor.Black, ConsoleColor.Red); }
            }

            repositorio.Atualiza(indiceSerie, DadosSerie(indiceSerie));
        }

        private static void InserirSerie()
        {
            Console.WriteLine("Inserir nova série");
            repositorio.Insere(DadosSerie(repositorio.ProximoId()));
            Console.Clear();
            ImprimirTexto("Série adicionada!", ConsoleColor.Black, ConsoleColor.Green);
        }

        private static Serie DadosSerie(int indiceSerie)
        {
            // Entrada de genero da série
            int entradaGenero = 0;
            System.Console.WriteLine("");
            ImprimirTexto("Gêneros:", ConsoleColor.Black, ConsoleColor.Blue);
            foreach (int i in Enum.GetValues(typeof(Genero)))
            {
                Console.WriteLine("{0}-{1}", i, Enum.GetName(typeof(Genero), i));
            }
            while (true)
            {
                Console.WriteLine("Digite o gênero entre as opções acima: ");

                string? valorEntrada = Console.ReadLine();
                if (int.TryParse(valorEntrada, out int value))
                {
                    entradaGenero = int.Parse(valorEntrada);
                    if (entradaGenero <= 0 || entradaGenero > Enum.GetValues(typeof(Genero)).Length)
                    {
                        ImprimirTexto($"Gênero não existe!", ConsoleColor.Black, ConsoleColor.Red);
                    }
                    else { break; }
                }
                else
                {
                    ImprimirTexto($"Valor digitado deve ser um numero!", ConsoleColor.Black, ConsoleColor.Red);
                }
            }

            // Entrada titulo da série
            ImprimirTexto("Digite o Título da Série: ", ConsoleColor.Black, ConsoleColor.White);

            string? entradaTitulo = Console.ReadLine();

            // Entrada ano da série
            int entradaAno;

            while (true)
            {
                Console.WriteLine("Digite o Ano de Início da Série: ");
                string? valorEntrada = Console.ReadLine();

                // Checar se valor é um int
                if (int.TryParse(valorEntrada, out int value))
                {
                    entradaAno = int.Parse(valorEntrada);
                    break;
                }
                else { ImprimirTexto($"Valor digitado deve ser um numero!", ConsoleColor.Black, ConsoleColor.Red); }
            }

            Console.Write("Digite a Descrição da Série: ");
            string? entradaDescricao = Console.ReadLine();

            Serie dadosSerie = new Serie(id: indiceSerie,
                                             genero: (Genero)entradaGenero,
                                             titulo: "",
                                             ano: 0,
                                             descricao: "");

            // evitar "possible dereference of null" aviso
            //referência: https://docs.microsoft.com/en-us/dotnet/csharp/nullable-warnings
            if (entradaTitulo is not null && entradaDescricao is not null)
            {
                dadosSerie = new Serie(id: indiceSerie,
                                             genero: (Genero)entradaGenero,
                                             titulo: entradaTitulo,
                                             ano: entradaAno,
                                             descricao: entradaDescricao);
            }
            return dadosSerie;
        }

        private static void ListarSeries()
        {
            Console.Clear();
            var lista = repositorio.Lista();

            ImprimirTexto("Listar séries", ConsoleColor.Black, ConsoleColor.Blue);

            if (lista.Count == 0)
            {
                ImprimirTexto($"Nenhuma série cadastrada!", ConsoleColor.Black, ConsoleColor.Red);
                return;
            }

            foreach (var serie in lista)
            {
                var excluido = serie.retornaExcluido();

                Console.WriteLine("#ID {0}: - {1} {2}", serie.retornaId(), serie.retornaTitulo(), (excluido ? "*Excluído*" : ""));
            }
        }

        private static string ObterOpcaoUsuario()
        {
            Console.WriteLine();
            ImprimirTexto("DIO Séries a seu dispor!!!", ConsoleColor.Black, ConsoleColor.Blue);
            ImprimirTexto("Informe a opção desejada:", ConsoleColor.Black, ConsoleColor.Green);

            Console.WriteLine("1- Listar séries");
            Console.WriteLine("2- Inserir nova série");
            Console.WriteLine("3- Atualizar série");            
            Console.WriteLine("5- Visualizar série");
            ImprimirTexto("4- Excluir série", ConsoleColor.Black, ConsoleColor.Red);
            ImprimirTexto("C- Limpar Tela", ConsoleColor.Black, ConsoleColor.Blue);            
            ImprimirTexto("X- Sair", ConsoleColor.Black, ConsoleColor.Green);
            Console.WriteLine();

            string? opcaoUsuario = Console.ReadLine();
            Console.WriteLine();
            return opcaoUsuario;

        }

        private static void ImprimirTexto(string texto, ConsoleColor backgroundColor, ConsoleColor foregroundColor)
        {
            Console.BackgroundColor = backgroundColor;
            Console.ForegroundColor = foregroundColor;
            Console.WriteLine(texto);
            Console.ResetColor();
        }
    }
}