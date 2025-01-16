## Keskonafait:

### Authentification côté backend - "Minimum vital"

- ✅ Créer une entité User
- ✅ Créer un resolver UserResolver
- ✅ Implémenter deux mutations signup et login
  - ✅ Hash les passwords avant enregistrement
  - ✅ Renvoyer un profil public en clair de l'utilisateur
  - ✅ Set le header pour enregistrer le cookie d'auth
- ✅ Implémenter le middleware de contexte Apollo
- ✅ Implémenter authChecker
- ✅ Ajouter le décorateur sur AdResolver pour empêcher un utilisateur anonyme de créer une annonce

### Authentification côté backend - Bonus et refacto

- ✅ makefile: ajouter une fonction "stop"
- ✅ Supprimer fichiers inutiles suite à changements d'outils
  - ✅ `wild.sqlite` Migration de SQLite à Postgres
  - ✅ `requests.http` Fichier de requetes REST, inutile depuis GraphQL
  - ✅ `migrations/` Non utilisées (générées automatiquement par TypeORM au besoin)
- index.ts
  - ✅ caster le numéro de port en Number
  - ✅ > authChecker
    - ✅ nettoyer commentaires & logs
    - ✅ adapter algo pour gérer le multiroles
  - ✅ > context
    - ✅ mieux séparer les tokens (cas d'un token setté ultérieurement)

## KESKONFOUT:

## Keskifofaire:

### Authentification côté backend - Bonus et refacto

- UserResolver
  - Dédupliquer code
  - Supprimer méthodes inutiles
  - Créer un enum des types possibles
- AdResolver
  - Rendre des méthodes privées
    - createAd
    - deleteAdById
    - replaceAdById

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
