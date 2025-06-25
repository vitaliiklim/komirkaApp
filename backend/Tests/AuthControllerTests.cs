using System.Net;
using System.Net.Http.Json;
using KomirkaApp.Api.Dtos;

namespace Tests;

public class AuthControllerTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;

    public AuthControllerTests(CustomWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Login_InvalidCredentials_ReturnsUnauthorized()
    {
        var dto = new LoginDto { Email = "invalid@example.com", Password = "wrong" };
        var response = await _client.PostAsJsonAsync("/api/auth/login", dto);
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }
}
