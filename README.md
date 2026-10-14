# Dames de porcelaine

Un jeu de dames roguelite en français, créé pour le thème **Dame** d’Inktober 2026.

[Jouer](https://dames-de-porcelaine.emmanuel-galland117.chatgpt.site) · [Calendrier Inktober](https://egalland.github.io/)

## Modes et pouvoirs

- Campagne de cinq duels contre l’ordinateur : Découverte, Stratège et Grand maître.
- Deux joueurs sur le même écran ou en ligne dans un salon à code de six caractères (expiration : 24 heures).
- Treize reliques : armures à deux vies, sauts, déplacements orthogonaux, dames volantes, explosions, vampirisme, résurrection et promotions.
- Atelier de mémoire pour chaque camp : une charge au départ, puis tous les trois tours. Réussir débloque un pouvoir immédiatement actif.
- Glisser-déposer ou sélection par clic, déplacements animés et particules ; mouvement réduit respecté.

Le damier utilise une **variante 8 × 8** : prises obligatoires dans les deux sens et dames à pas courts, sauf pouvoir spécifique. Ce n’est pas le règlement officiel des dames internationales.

## Architecture

TypeScript, React et Vinext. Le moteur partagé est dans `lib/game.ts`, l’IA dans `lib/ai.ts`, les salons dans `app/api/rooms/route.ts`. Le serveur vérifie les coups et les récompenses. Cloudflare D1 conserve les salons ; la campagne solo reste dans le navigateur.

GitHub Pages fournit un lien vers l’app hébergée. Les salons nécessitent un serveur et ne fonctionnent pas dans un hébergement purement statique.

## Développement

Node.js ≥ 22.13, pnpm.

```sh
pnpm install
pnpm dev
pnpm exec tsc --noEmit
pnpm build
```

Le mode solo fonctionne sans données distantes. Pour tester les salons, déclarer le binding D1 `DB`, générer l’artefact Worker puis appliquer `drizzle/0000_wooden_jigsaw.sql` à la base locale avec Wrangler. Le fichier `.openai/hosting.json` fourni décrit les bindings, sans identité du déploiement de production.

```sh
pnpm build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_wooden_jigsaw.sql
pnpm start
```

## Validation

Tests du moteur, des pouvoirs, des recherches tactiques et des salons avec base simulée. Les tests de salons ne remplacent pas une vérification sur deux appareils réels.

```sh
node tests/engine.test.cjs
node tests/ai.test.cjs
node tests/rooms.test.cjs
```

L’IA de l’atelier utilise une probabilité de réussite (35 %, 65 % ou 85 %), distincte de sa recherche de coups. Les parties sans prise n’ont pas encore de règle de match nul.

L’illustration de luxe est générée par IA. Aucun secret ni donnée de salon n’est inclus dans ce dépôt.
