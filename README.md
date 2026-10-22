# Profis Industrie Service – site statique

Version HTML/CSS/JS pure (sans WordPress, sans PHP, sans base de données) de
https://profis-industie-service.store/, en trois langues :

| Langue | Dossier |
|--------|---------|
| English (défaut) | `/` |
| Deutsch | `/de/` |
| Français | `/fr/` |

## Contenu
- `index.html`, `*.html` : pages (contenu repris de l'export WordPress)
- `assets/style.css`, `assets/site.js` : design, menu, filtre produits, formulaire de contact
- `assets/img/` : images optimisées (max 1600 px)

## Déploiement
Aucun build requis : hébergez le dossier tel quel (GitHub Pages, Netlify, OVH, Strato…).
Les liens sont relatifs, le site fonctionne donc aussi dans un sous-dossier.

## Notes
- Le formulaire de contact ouvre le client e-mail (`mailto:`). Pour un envoi direct depuis le site,
  brancher un service de formulaire (Formspree, Netlify Forms…) sur `#cform`.
- Les vidéos YouTube utilisent `youtube-nocookie.com`.
- Pages non traduites à l'origine (ex. Références, Statistiques en FR) : contenu anglais avec un bandeau d'information.
- La boutique WooCommerce (panier, compte, commande) est remplacée par un catalogue produits avec recherche ;
  les commandes se font via la page Contact.
