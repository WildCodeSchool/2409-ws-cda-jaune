## Keskonafait:

## KESKONFOUT:

## Keskifofaire:

### Authentification côté backend

- ✅ Créer une entité User
- ✅ Créer un resolver UserResolver
- Implémenter deux mutations signup et login
  - ✅ Hash les passwords avant enregistrement
  - ✅ Renvoyer un profil public en clair de l'utilisateur
  - Set le header pour enregistrer le cookie d'auth
- Implémenter authChecker et le middleware de contexte Apollo
- Ajouter le décorateur sur AdResolver pour empêcher un utilisateur anonyme de créer une annonce

## Backlog et bugfixes pour plus tard:

- molecules/Search

  - Fonctionnement general

- organisms/AdCreationForm
  - label sur Select (multi-select)
- organisms/AdEditionForm
  - label sur Select (multi-select)
- pages/AdPage
  - getAdById ne fournit pas la categorie ou les tags (x2)
- pages/HomePage
  - getAdById ne fournit pas la categorie ou les tags
