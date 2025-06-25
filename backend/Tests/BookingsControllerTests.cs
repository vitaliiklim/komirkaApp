using System.Net;

namespace Tests;

public class BookingsControllerTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;

    public BookingsControllerTests(CustomWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetAll_ReturnsOk()
    {
        var response = await _client.GetAsync("/api/bookings");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}
