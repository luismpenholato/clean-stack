using System.Diagnostics.CodeAnalysis;
using System.Reflection;

namespace CleanStack.Domain;

[ExcludeFromCodeCoverage]
public class AssemblyReference
{
    public Assembly GetAssembly() => GetType().Assembly;
}
