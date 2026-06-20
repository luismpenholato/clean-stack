using Boilerplate.Application.Features.Products.Commands.CreateProduct;
using Boilerplate.Application.Features.Products.Commands.DeleteProduct;
using Boilerplate.Application.Features.Products.Commands.UpdateProduct;
using Boilerplate.Application.Features.Products.Queries.GetProductById;
using Boilerplate.Application.Features.Products.Queries.ListExternalProducts;
using Boilerplate.Application.Features.Products.Queries.ListProducts;
using Boilerplate.CrossCutting.Dto.Products;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Boilerplate.Interface.Controllers;

[ApiController]
[Route("api/products")]
public sealed class ProductsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProductsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ProductDto>>> List(CancellationToken cancellationToken)
    {
        IReadOnlyList<ProductDto> result = await _mediator.Send(new ListProductsQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpGet("external")]
    public async Task<ActionResult<IReadOnlyList<ExternalProductDto>>> ListExternal(CancellationToken cancellationToken)
    {
        IReadOnlyList<ExternalProductDto> result = await _mediator.Send(new ListExternalProductsQuery(), cancellationToken);
        return Ok(result);
    }

    [HttpGet("{id:long}")]
    public async Task<ActionResult<ProductDto>> GetById(long id, CancellationToken cancellationToken)
    {
        ProductDto? result = await _mediator.Send(new GetProductByIdQuery(id), cancellationToken);

        return result is null ? (ActionResult<ProductDto>)NotFound() : (ActionResult<ProductDto>)Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductCommand command, CancellationToken cancellationToken)
    {
        ProductDto result = await _mediator.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:long}")]
    public async Task<ActionResult<ProductDto>> Update(long id, [FromBody] UpdateProductCommand command, CancellationToken cancellationToken)
    {
        if (id != command.Id)
        {
            return BadRequest("Id da rota diferente do payload.");
        }

        ProductDto? result = await _mediator.Send(command, cancellationToken);

        return result is null ? (ActionResult<ProductDto>)NotFound() : (ActionResult<ProductDto>)Ok(result);
    }

    [HttpDelete("{id:long}")]
    public async Task<ActionResult> Delete(long id, CancellationToken cancellationToken)
    {
        var deleted = await _mediator.Send(new DeleteProductCommand(id), cancellationToken);

        return !deleted ? NotFound() : NoContent();
    }
}
