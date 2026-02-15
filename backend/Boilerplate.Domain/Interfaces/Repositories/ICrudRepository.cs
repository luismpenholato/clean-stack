using Boilerplate.Domain.Interfaces.Entities;

namespace Boilerplate.Domain.Interfaces.Repositories;

public interface ICrudRepository<T> where T : class, IEntity
{
    Task<T?> GetByIdAsync(long id, CancellationToken cancellationToken);
    Task<T?> GetByIdTrackingAsync(long id, CancellationToken cancellationToken);
    Task<IReadOnlyList<T>> ListAsync(CancellationToken cancellationToken);
    Task AddAsync(T entity, CancellationToken cancellationToken);
    Task AddRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken);
    Task UpdateAsync(T entity, CancellationToken cancellationToken);
    Task UpdateRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(long id, CancellationToken cancellationToken);
    Task DeleteRangeAsync(IEnumerable<long> ids, CancellationToken cancellationToken);
}
