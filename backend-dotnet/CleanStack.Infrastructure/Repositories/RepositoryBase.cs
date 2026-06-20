using CleanStack.Domain.Interfaces.Entities;
using CleanStack.Domain.Interfaces.Repositories;
using CleanStack.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CleanStack.Infrastructure.Repositories;

public abstract class RepositoryBase<T, TKey> : ICrudRepository<T, TKey>
    where T : class, IEntity<TKey>
    where TKey : IEquatable<TKey>
{
    private readonly AppDbContext _context;

    protected RepositoryBase(AppDbContext context)
    {
        _context = context;
        Set = context.Set<T>();
    }

    protected DbSet<T> Set { get; }

    public virtual async Task<T?> GetByIdAsync(TKey id, CancellationToken cancellationToken) => await Set.AsNoTracking().FirstOrDefaultAsync(e => e.Id.Equals(id), cancellationToken);

    public virtual async Task<T?> GetByIdTrackingAsync(TKey id, CancellationToken cancellationToken) => await Set.FirstOrDefaultAsync(e => e.Id.Equals(id), cancellationToken);

    public virtual async Task<IReadOnlyList<T>> ListAsync(CancellationToken cancellationToken) => await Set.AsNoTracking().ToListAsync(cancellationToken);

    public virtual async Task AddAsync(T entity, CancellationToken cancellationToken)
    {
        _ = Set.Add(entity);
        _ = await _context.SaveChangesAsync(cancellationToken);
    }

    public virtual async Task AddRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken)
    {
        Set.AddRange(entities);
        _ = await _context.SaveChangesAsync(cancellationToken);
    }

    public virtual async Task UpdateAsync(T entity, CancellationToken cancellationToken)
    {
        _ = Set.Update(entity);
        _ = await _context.SaveChangesAsync(cancellationToken);
    }

    public virtual async Task UpdateRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken)
    {
        Set.UpdateRange(entities);
        _ = await _context.SaveChangesAsync(cancellationToken);
    }

    public virtual async Task<bool> DeleteAsync(TKey id, CancellationToken cancellationToken)
    {
        T? entity = await Set.FirstOrDefaultAsync(e => e.Id.Equals(id), cancellationToken);

        if (entity is null)
        {
            return false;
        }

        _ = Set.Remove(entity);
        _ = await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    public virtual async Task DeleteRangeAsync(IEnumerable<TKey> ids, CancellationToken cancellationToken)
    {
        var idList = ids.ToList();
        List<T> entities = await Set.Where(e => idList.Contains(e.Id)).ToListAsync(cancellationToken);

        if (entities.Count == 0)
        {
            return;
        }

        Set.RemoveRange(entities);
        _ = await _context.SaveChangesAsync(cancellationToken);
    }
}
