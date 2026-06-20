using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CleanStack.CrossCutting.IOC.DependencyInjection;

public static class ConfigureBindingsDependencyInjection
{
    public static void RegisterBindings(IServiceCollection services, IConfiguration configuration, IHostEnvironment environment)
    {
        #region Options
        ConfigureBindingsOptions.RegisterBindings(services, configuration);
        #endregion

        #region Database
        ConfigureBindingsDatabaseContext.RegisterBindings(services, configuration, environment);
        #endregion

        #region MediatR
        ConfigureBindingsMediatR.RegisterBindings(services);
        #endregion

        #region Repository
        ConfigureBindingsRepository.RegisterBindings(services);
        #endregion

        #region UnitOfWork
        ConfigureBindingsUnitOfWork.RegisterBindings(services);
        #endregion

        #region Services
        ConfigureBindingsServices.RegisterBindings(services);
        #endregion

        #region Integration
        ConfigureBindingsIntegration.RegisterBindings(services, configuration);
        #endregion

        #region Validator
        ConfigureBindingsValidator.RegisterBindings(services);
        #endregion

        #region HealthChecks
        ConfigureBindingsHealthChecks.RegisterBindings(services);
        #endregion
    }
}
