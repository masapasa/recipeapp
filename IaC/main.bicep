@sys.description('The FE Web App name.')
@minLength(3)
@maxLength(30)
param appServiceAppNameFe string = 'dsanmart-fe-app-bicep'
@sys.description('The BE Web App name.')
@minLength(3)
@maxLength(30)
param appServiceAppNameBe string = 'dsanmart-be-app-bicep'
@sys.description('The App Service Plan name.')
@minLength(3)
@maxLength(24)
param appServicePlanName string = 'dsanmart-app-bicep'
@sys.description('The Storage Account name.')
@minLength(3)
@maxLength(24)
param storageAccountName string = 'dsanmartstorage'
@sys.description('The environment type.')
@allowed([
  'nonprod'
  'prod'
  ])
param environmentType string = 'nonprod'
param location string = resourceGroup().location
var storageAccountSkuName = (environmentType == 'prod') ? 'Standard_GRS' : 'Standard_LRS'  
var appServicePlanSkuName = (environmentType == 'prod') ? 'B1' : 'F1'

@sys.description('The PostgreSQL server name.')
@minLength(3)
@maxLength(30)
param postgreServerName string = 'jseijas-dbsrv'

@sys.description('The PostgreSQL database name.')
@minLength(3)
@maxLength(30)
param dbname string = 'dsanmart-db'

resource storageAccount 'Microsoft.Storage/storageAccounts@2022-05-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: storageAccountSkuName
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
  }
}
resource postgreServer 'Microsoft.DBforPostgreSQL/servers@2017-12-01' existing = {
  name: postgreServerName
}
resource serverDatabase 'Microsoft.DBforPostgreSQL/servers/databases@2017-12-01' = {
  name: dbname
  parent: postgreServer
}
resource appServicePlan 'Microsoft.Web/serverFarms@2022-03-01' = {
  name: appServicePlanName
  location: location
  kind: 'linux'
  sku: {
    name: appServicePlanSkuName
  }
}
resource appServiceAppFe 'Microsoft.Web/sites@2022-03-01' = {
  name: appServiceAppNameFe
  location: location
  properties: {
  serverFarmId: appServicePlan.id
  httpsOnly: true
  }
}
resource appServiceAppBe 'Microsoft.Web/sites@2022-03-01' = {
  name: appServiceAppNameBe
  location: location
  properties: {
  serverFarmId: appServicePlan.id
  httpsOnly: true
  }
}
