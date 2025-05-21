# Portfolio Marathon Style

Un portfolio inspiré du jeu Marathon, avec une interface en deux modes : un design standard à défilement vertical et un mode bureau avec fenêtres interactives.

## Caractéristiques

- Design néo-rétro inspiré par Marathon
- Mode standard avec sections à défilement
- Mode bureau avec fenêtres déplaçables
- Animations et effets visuels
- Formulaire de contact en style terminal
- Sections About, Skills, Projects et Contact

## Technologies

- Next.js avec TypeScript
- Tailwind CSS pour le style
- Framer Motion pour les animations
- EmailJS pour le formulaire de contact

## Configuration du formulaire de contact

Le formulaire de contact utilise EmailJS pour envoyer des emails. Pour le configurer :

1. Créez un compte sur [EmailJS](https://www.emailjs.com/)
2. Créez un service (par exemple avec Gmail)
3. Créez un template d'email avec les variables `from_email`, `to_email` et `message`
4. Mettez à jour les valeurs suivantes dans le fichier `src/lib/EmailJSInitializer.tsx` :
   ```typescript
   const EMAILJS_PUBLIC_KEY = 'votre-clé-publique';
   ```
5. Et dans le fichier `src/components/ContactTerminal.tsx` :
   ```typescript
   const EMAILJS_SERVICE_ID = 'votre-service-id';
   const EMAILJS_TEMPLATE_ID = 'votre-template-id';
   ```

## Démarrage

```bash
# Installation des dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build

# Lancer la version de production
npm run start
```

## Personnalisation

- Les couleurs principales sont définies dans `tailwind.config.ts` et `src/styles/globals.css`
- Les principaux composants se trouvent dans le dossier `src/components`
- Le mode d'affichage est géré par le contexte dans `src/lib/context/LayoutModeContext.tsx`