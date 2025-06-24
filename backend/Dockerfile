# ---- Build stage ----
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copy all source files including appsettings.json
COPY . ./

# Restore dependencies
RUN dotnet restore "KomirkaApp.Api.csproj"

# Publish application
RUN dotnet publish "KomirkaApp.Api.csproj" -c Release -o /app/publish

# ---- Runtime stage ----
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app
EXPOSE 80
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "KomirkaApp.Api.dll"]