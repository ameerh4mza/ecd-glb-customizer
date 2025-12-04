<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# ECD Car Configurator Project Instructions

This is a Next.js car configurator demo project inspired by ECD Auto Design. The project features:

## Key Technologies

- Next.js with App Router
- JavaScript (ES6+)
- Tailwind CSS for styling
- Three.js for 3D car models
- Server-side rendering

## Project Structure

- Use the `src/` directory structure
- Components should be modular and reusable
- Store GLB files in public/models directory
- Server-side rendering for performance

## Key Features to Implement

1. **3D Car Model Viewer**: Integration with Three.js for displaying GLB car models
2. **Color Customization**: Pre-defined color palette for changing car colors
3. **Rim Selection**: Different rim styles and designs
4. **Grill Customization**: Various grill options
5. **Interactive UI**: Smooth transitions and real-time updates

## Code Guidelines

- Use functional components with React hooks
- Implement proper error handling for API calls
- Ensure responsive design with Tailwind CSS
- Use Next.js Image optimization for better performance
- Follow accessibility best practices
- Implement loading states for better UX

## GLB Model Integration

- Use local GLB files for 3D models
- Implement Three.js GLB loader for model rendering
- Store GLB files in the public/models directory
- Use gltfjsx tool to convert GLB files to React components when needed

## Styling Guidelines

- Use Tailwind CSS utility classes
- Maintain consistent color scheme
- Implement smooth animations and transitions
- Ensure mobile-first responsive design
