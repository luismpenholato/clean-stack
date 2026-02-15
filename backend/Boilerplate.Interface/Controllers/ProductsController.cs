using Boilerplate.Application.Features.Products.Commands.CreateProduct;
using Boilerplate.Application.Features.Products.Commands.DeleteProduct;
using Boilerplate.Application.Features.Products.Commands.UpdateProduct;
using Boilerplate.CrossCutting.Dto.Products;
using Boilerplate.Domain.Interfaces.Services;
using Boilerplate.Application.Features.Products.Queries.GetProductById;
using Boilerplate.Application.Features.Products.Queries.ListProducts;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Boilerplate.Interface.Controllers;

[ApiController]
[Route("api/products")]
public sealed class ProductsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IExternalProductService _externalProductService;

    public ProductsController(IMediator mediator, IExternalProductService externalProductService)
    {
        _mediator = mediator;
        _externalProductService = externalProductService;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ProductDto>>> List(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new ListProductsQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpGet("external")]
    public async Task<ActionResult<IReadOnlyList<ExternalProductDto>>> ListExternal(CancellationToken cancellationToken)
    {
        var result = await _externalProductService.GetProductsAsync(cancellationToken);
        return Ok(result);
    }

    [HttpGet("{id:long}")]
    public async Task<ActionResult<ProductDto>> GetById(long id, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetProductByIdQuery(id), cancellationToken);

        if (result is null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductCommand command, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:long}")]
    public async Task<ActionResult<ProductDto>> Update(long id, [FromBody] UpdateProductCommand command, CancellationToken cancellationToken)
    {
        if (id != command.Id)
        {
            return BadRequest("Id da rota diferente do payload.");
        }

        var result = await _mediator.Send(command, cancellationToken);

        if (result is null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpDelete("{id:long}")]
    public async Task<ActionResult> Delete(long id, CancellationToken cancellationToken)
    {
        var deleted = await _mediator.Send(new DeleteProductCommand(id), cancellationToken);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
