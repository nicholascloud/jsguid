using System;

public class Program {
  public static void Main(String[] args) {
    int argLength = args.Length;

    if (argLength == 0) {
      WriteGuids(1);
      return;
    }

    if (argLength == 1) {
      string arg = args[0];
      int howMany;
      if (Int32.TryParse(arg, out howMany)) {
        WriteGuids(howMany);
      } else {
        throw new Exception("argument must be numeric");
      }
      return;
    }
  }

  private static void WriteGuids(int howMany) {
    for (int i = 0; i < howMany; i++) {
      Console.WriteLine(Guid.NewGuid());
    }
  }
}
