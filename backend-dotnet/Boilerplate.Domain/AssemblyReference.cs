using System.Diagnostics.CodeAnalysis;
using System.Reflection;

namespace Boilerplate.Domain;

[ExcludeFromCodeCoverage]
public class AssemblyReference
{
    public Assembly GetAssembly() => GetType().Assembly;
}
