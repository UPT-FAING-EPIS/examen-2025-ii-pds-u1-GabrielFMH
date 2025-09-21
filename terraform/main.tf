terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "attendance_rg" {
  name     = "attendance-rg"
  location = "East US"
}

resource "azurerm_postgresql_server" "attendance_db" {
  name                = "attendance-postgres"
  location            = azurerm_resource_group.attendance_rg.location
  resource_group_name = azurerm_resource_group.attendance_rg.name

  sku_name = "B_Gen5_1"

  storage_mb                   = 5120
  backup_retention_days        = 7
  geo_redundant_backup_enabled = false
  auto_grow_enabled            = true

  administrator_login          = "postgres"
  administrator_login_password = "P@ssw0rd123!"
  version                      = "11"
  ssl_enforcement_enabled      = true
}

resource "azurerm_postgresql_database" "attendance_db" {
  name                = "AttendanceDb"
  resource_group_name = azurerm_resource_group.attendance_rg.name
  server_name         = azurerm_postgresql_server.attendance_db.name
  charset             = "UTF8"
  collation           = "English_United States.1252"
}

resource "azurerm_app_service_plan" "attendance_plan" {
  name                = "attendance-app-service-plan"
  location            = azurerm_resource_group.attendance_rg.location
  resource_group_name = azurerm_resource_group.attendance_rg.name

  sku {
    tier = "Free"
    size = "F1"
  }
}

resource "azurerm_app_service" "attendance_backend" {
  name                = "attendance-backend-${random_string.suffix.result}"
  location            = azurerm_resource_group.attendance_rg.location
  resource_group_name = azurerm_resource_group.attendance_rg.name
  app_service_plan_id = azurerm_app_service_plan.attendance_plan.id

  site_config {
    dotnet_framework_version = "v6.0"
    scm_type                 = "LocalGit"
  }

  app_settings = {
    "ASPNETCORE_ENVIRONMENT" = "Production"
    "ConnectionStrings__DefaultConnection" = "Host=${azurerm_postgresql_server.attendance_db.fqdn};Database=${azurerm_postgresql_database.attendance_db.name};Username=${azurerm_postgresql_server.attendance_db.administrator_login}@${azurerm_postgresql_server.attendance_db.name};Password=${azurerm_postgresql_server.attendance_db.administrator_login_password};SSL Mode=Require;Trust Server Certificate=true"
  }
}

resource "azurerm_static_site" "attendance_frontend" {
  name                = "attendance-frontend-${random_string.suffix.result}"
  location            = azurerm_resource_group.attendance_rg.location
  resource_group_name = azurerm_resource_group.attendance_rg.name
}

resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}