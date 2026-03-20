export function getCourseThumbnail(category: string): string {
    const c = (category || '').toLowerCase()
    if (c.includes('robot-design') || c.includes('building') || c.includes('конструир'))
        return '/images/course-build.png'
    if (c.includes('coding') || c.includes('программир'))
        return '/images/course-coding.png'
    if (c.includes('core-values') || c.includes('core values') || c.includes('құндылық'))
        return '/images/robot-fll.png'
    if (c.includes('innovation') || c.includes('инновац') || c.includes('жоба'))
        return '/images/course-cad.png'
    if (c.includes('cad') || c.includes('design'))
        return '/images/course-cad.png'
    if (c.includes('ftc') && c.includes('build'))
        return '/images/thumb-fll-robot.jpg'
    if (c.includes('inspire'))
        return '/images/course-cad.png'
    return '/images/course-build.png'
}
