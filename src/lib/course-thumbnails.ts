export function getCourseThumbnail(category: string, level?: string): string {
    const cat = category?.toLowerCase()

    // FTC courses
    if (cat?.includes('ftc') && cat?.includes('cod')) return '/images/thumb-fll-coding.jpg'
    if (cat?.includes('ftc') && cat?.includes('build')) return '/images/thumb-fll-robot.jpg'
    if (cat?.includes('ftc') && cat?.includes('cad')) return '/images/thumb-cad.jpg'

    // FLL courses  
    if (cat?.includes('robot-design') || cat?.includes('конструир') || cat?.includes('building')) {
        return '/images/thumb-fll-robot.jpg'
    }
    if (cat?.includes('coding') || cat?.includes('программир')) {
        return '/images/thumb-fll-coding.jpg'
    }
    if (cat?.includes('core-values') || cat?.includes('core values') || cat?.includes('құндылық')) {
        return '/images/thumb-fll-robot.jpg'
    }
    if (cat?.includes('innovation') || cat?.includes('инновац') || cat?.includes('жоба')) {
        return '/images/thumb-cad.jpg'
    }

    // Fallback
    return '/images/thumb-fll-robot.jpg'
}
