using System.Diagnostics.CodeAnalysis;
using System.Reflection;

namespace CleanStack.Application;

[ExcludeFromCodeCoverage]
public class AssemblyReference
{
    public Assembly GetAssembly() => GetType().Assembly;
}
