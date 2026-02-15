using Boilerplate.Domain.Interfaces.Entities;
using Boilerplate.Domain.Interfaces.Repositories;
using Boilerplate.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Boilerplate.Infrastructure.Repositories;

public abstract class RepositoryBase<T> : ICrudRepository<T> where T : class, IEntity
{
    private readonly AppDbContext _context;

    protected RepositoryBase(AppDbContext context)
    {
        _context = context;
        Set = context.Set<T>();
    }

    protected DbSet<T> Set { get; }

    public virtual async Task<T?> GetByIdAsync(long id, CancellationToken cancellationToken)
    {
        return await Set.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id, cancellationToken);
    }

    public virtual async Task<T?> GetByIdTrackingAsync(long id, CancellationToken cancellationToken)
    {
        return await Set.FirstOrDefaultAsync(e => e.Id == id, cancellationToken);
    }

    public virtual async Task<IReadOnlyList<T>> ListAsync(CancellationToken cancellationToken)
    {
        return await Set.AsNoTracking().ToListAsync(cancellationToken);
    }

    public virtual async Task AddAsync(T entity, CancellationToken cancellationToken)
    {
        Set.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public virtual async Task AddRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken)
    {
        Set.AddRange(entities);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public virtual async Task UpdateAsync(T entity, CancellationToken cancellationToken)
    {
        Set.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public virtual async Task UpdateRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken)
    {
        Set.UpdateRange(entities);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public virtual async Task<bool> DeleteAsync(long id, CancellationToken cancellationToken)
    {
        var entity = await Set.FirstOrDefaultAsync(e => e.Id == id, cancellationToken);

        if (entity is null)
        {
            return false;
        }

        Set.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    public virtual async Task DeleteRangeAsync(IEnumerable<long> ids, CancellationToken cancellationToken)
    {
        var entities = await Set.Where(e => ids.Contains(e.Id)).ToListAsync(cancellationToken);

        if (entities.Count == 0)
        {
            return;
        }

        Set.RemoveRange(entities);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
