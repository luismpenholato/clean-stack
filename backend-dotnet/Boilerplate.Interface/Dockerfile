FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS runtime
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS builder
ARG CONFIG=Release
WORKDIR /src
COPY ["Boilerplate.Interface/Boilerplate.Interface.csproj", "Boilerplate.Interface/"]
COPY ["Boilerplate.CrossCutting.IOC/Boilerplate.CrossCutting.IOC.csproj", "Boilerplate.CrossCutting.IOC/"]
COPY ["Boilerplate.Application/Boilerplate.Application.csproj", "Boilerplate.Application/"]
COPY ["Boilerplate.CrossCutting/Boilerplate.CrossCutting.csproj", "Boilerplate.CrossCutting/"]
COPY ["Boilerplate.Domain/Boilerplate.Domain.csproj", "Boilerplate.Domain/"]
COPY ["Boilerplate.Infrastructure/Boilerplate.Infrastructure.csproj", "Boilerplate.Infrastructure/"]
RUN dotnet restore "Boilerplate.Interface/Boilerplate.Interface.csproj"
COPY . .
WORKDIR /src/Boilerplate.Interface
RUN dotnet build "Boilerplate.Interface.csproj" -c $CONFIG -o /out/build

FROM builder AS publisher
ARG CONFIG=Release
RUN dotnet publish "Boilerplate.Interface.csproj" -c $CONFIG -o /out/publish /p:UseAppHost=false

FROM runtime
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:80
COPY --from=publisher /out/publish .
ENTRYPOINT ["dotnet", "Boilerplate.Interface.dll"]
