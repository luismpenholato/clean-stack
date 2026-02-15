using System.Diagnostics.CodeAnalysis;
using System.Reflection;

namespace Boilerplate.Application;

[ExcludeFromCodeCoverage]
public class AssemblyReference
{
    public Assembly GetAssembly() => GetType().Assembly;
}
