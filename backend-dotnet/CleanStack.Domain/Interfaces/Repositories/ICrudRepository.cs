using CleanStack.Domain.Interfaces.Entities;

namespace CleanStack.Domain.Interfaces.Repositories;

public interface ICrudRepository<T, TKey> where T : class, IEntity<TKey> where TKey : IEquatable<TKey>
{
    Task<T?> GetByIdAsync(TKey id, CancellationToken cancellationToken);
    Task<T?> GetByIdTrackingAsync(TKey id, CancellationToken cancellationToken);
    Task<IReadOnlyList<T>> ListAsync(CancellationToken cancellationToken);
    Task AddAsync(T entity, CancellationToken cancellationToken);
    Task AddRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken);
    Task UpdateAsync(T entity, CancellationToken cancellationToken);
    Task UpdateRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(TKey id, CancellationToken cancellationToken);
    Task DeleteRangeAsync(IEnumerable<TKey> ids, CancellationToken cancellationToken);
}
