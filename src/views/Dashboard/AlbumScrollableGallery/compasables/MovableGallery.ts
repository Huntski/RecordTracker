import router from "@/router"

export class MovableGallery {
    xTouchStartAt = 0
    yTouchStartAt = 0
    xPosition = 0
    yPosition = 0
    mouseDown = false
    moving = false
    moveX = 0
    moveY = 0
    gallery: HTMLElement|Record<any, any>
    mouseSpeedX = 0
    mouseSpeedY = 0
    animationInterval?: NodeJS.Timer

    constructor(gallery: HTMLElement|Record<any, any>) {
        this.gallery = gallery

        this.initMouseEvents()
    }

    animateGalleryPosition(moveDistanceX: number, moveDistanceY: number, duration = 200): void {
        this.moveX = this.xPosition + moveDistanceX
        this.moveY = this.yPosition + moveDistanceY

        this.gallery.style.transform = `translate(${this.moveX}px, ${this.moveY}px)`

        this.animationInterval = setInterval(() => {
            this.scaleBubblesWithSideOffset()
        }, 100)

        this.gallery.animate({
            transform: `translate(${this.moveX}px, ${this.moveY}px)`
        }, {
            duration: duration,
            fill: 'forwards',
            easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
        }).finished.then(() => {
            clearInterval(this.animationInterval)
            this.animationInterval = undefined
            this.scaleBubblesWithSideOffset()
        })
    }

    initMouseEvents(): void {
        this.gallery.onmousedown = (e: MouseEvent) => {
            this.mouseDownEvent(e)
        }
        document.onmouseup = () => {
            this.mouseUpEvent()
        }
        this.gallery.onmousemove = (e: MouseEvent) => {
            this.mouseMoveEvent(e)
        }
    }

    moveBubbleToCenterOfScreen(bubble: Element): void {
        try {
            const rect = bubble.getBoundingClientRect()

            const rectX = rect.x + (rect.width / 2)
            const rectY = rect.y + (rect.height / 2)

            const moveDistanceX = window.innerWidth / 2 - rectX
            const moveDistanceY = window.innerHeight / 2 - rectY

            this.animateGalleryPosition(moveDistanceX, moveDistanceY, 1000)
        } catch (e) {
            console.log(e)
        }
    }

    mouseDownEvent(e: MouseEvent): void {
        const target = e.target as HTMLElement

        if (target.className !== 'row' && target.className !== 'bubble') {
            return
        }

        this.mouseDown = true

        this.xTouchStartAt = e.clientX
        this.yTouchStartAt = e.clientY

        this.xPosition = this.moveX
        this.yPosition = this.moveY
    }

    mouseUpEvent(): void {
        if (router.currentRoute.value.name !== 'Dashboard') return

        this.xPosition = this.moveX
        this.yPosition = this.moveY

        const highestXYSpeed = this.mouseSpeedX > this.mouseSpeedY ? this.mouseSpeedX : this.mouseSpeedY
        let dragDuration = highestXYSpeed * 5

        if (dragDuration < 800) dragDuration = 800

        this.animateGalleryPosition(this.mouseSpeedX * 9, this.mouseSpeedY * 9, dragDuration)

        this.mouseDown = false
        setTimeout(() => {
            this.moving = false
        }, 100)
    }

    mouseMoveEvent(e: MouseEvent): void {
        if (!this.mouseDown) return

        this.mouseSpeedX = e.movementX
        this.mouseSpeedY = e.movementY

        const moveDistanceX = e.clientX - this.xTouchStartAt
        const moveDistanceY = e.clientY - this.yTouchStartAt

        if (moveDistanceX > 5 || moveDistanceY > 5) {
            this.moving = true
        }

        this.animateGalleryPosition(moveDistanceX, moveDistanceY)
    }

    scaleBubblesWithSideOffset(): void {
        const bubbles = document.getElementsByClassName('bubble') as HTMLCollectionOf<HTMLElement>

        for (const element of bubbles) {
            if (!this.isInViewport(element)) continue

            const rect = element.getBoundingClientRect()

            let sizeTop: number
            let sizeLeft: number

            const screenHeight = window.innerHeight
            const screenWidth = window.innerWidth

            sizeTop = (rect.top + (rect.height / 2) - (screenHeight / 2)) / screenHeight
            sizeTop = 1 - Math.abs(sizeTop)
            sizeTop = (sizeTop < 0 ? 0 : (sizeTop > 1 ? 1 : sizeTop))

            sizeLeft = (rect.left + (rect.width / 2) - (screenWidth / 2)) / screenWidth
            sizeLeft = 1 - Math.abs(sizeLeft)
            sizeLeft = (sizeLeft < 0 ? 0 : (sizeLeft > 1 ? 1 : sizeLeft))

            const size = (sizeTop + sizeLeft) / 2

            element.style.transform = `scale(${size})`

            const opacity = parseFloat(String(size)).toFixed(1)

            const image = element.querySelector('img')

            if (image) image.style.opacity = opacity
        }

        requestAnimationFrame(() => this.scaleBubblesWithSideOffset)
    }

    isInViewport(element: HTMLElement): boolean {
        const rect = element.getBoundingClientRect()

        return (
            rect.top >= -rect.width &&
            rect.left >= -rect.width &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + rect.width &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) + rect.width
        )
    }
}
