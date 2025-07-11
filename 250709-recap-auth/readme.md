# Authentification

## Backend

- methodes signup
  - hasher password
  - record user
  - renvoyer profil public
  - renvoyer token en cookie
- context
- methode login
- createScenario -> record user

## Frontend

# Autorisation

## Backend

- authChecker
- @Authorized

## Frontend

---

- Formulaires
  - login
  - signup
  - (j'aime pas les formulaires)
  - doit appeler le backend
- Générer hooks Codegen
- Stocker l'user authentifié
  - store
  - Apollo Cache
- Gérer le logout
  - clean store
  - remove cookies
  - ❌ Pas de cookie ni de JWT côté front
- Composants (ou pages) vont changer leur affichage/comportement
  - Verifier le profil du User
