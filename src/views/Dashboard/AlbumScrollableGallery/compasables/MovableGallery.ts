export class MovableGallery {
    xTouchStartAt = 0
    yTouchStartAt = 0
    xPosition = 0
    yPosition = 0
    mouseDown = false
    moveX = 0
    moveY = 0
    gallery: HTMLElement

    constructor(gallery: HTMLElement) {
        this.gallery = gallery

        this.initMouseEvents()
    }

    animateGalleryPosition(moveDistanceX: number, moveDistanceY: number): void {
        this.moveX = this.xPosition + moveDistanceX
        this.moveY = this.yPosition + moveDistanceY

        this.gallery.animate({
            transform: `translate(${this.moveX}px, ${this.moveY}px)`
        }, {
            duration: 200,
            fill: 'forwards'
        })
    }

    initMouseEvents(): void {
        this.gallery.onmousedown = (e) => {
            this.mouseDownEvent(e)
        }
        document.onmouseup = () => {
            this.mouseUpEvent()
        }
        document.onmousemove = (e) => {
            this.mouseMoveEvent(e)
        }
    }

    moveBubbleToCenterOfScreen(bubble: any) {
        try {
            const rect = bubble.getBoundingClientRect()

            const posX = rect.x + (rect.width / 2)
            const posY = rect.y + (rect.height / 2)

            const moveDistanceX = window.innerWidth / 2 - posX
            const moveDistanceY = window.innerHeight / 2 - posY

            this.animateGalleryPosition(moveDistanceX, moveDistanceY)

        } catch (e) {
            console.log(e)
        }
    }

    mouseDownEvent(e: MouseEvent): void {
        this.mouseDown = true

        this.xTouchStartAt = e.clientX
        this.yTouchStartAt = e.clientY

        this.xPosition = this.moveX
        this.yPosition = this.moveY
    }

    mouseUpEvent(): void {
        this.xPosition = this.moveX
        this.yPosition = this.moveY

        this.mouseDown = false
    }

    mouseMoveEvent(e: MouseEvent): void {
        if (!this.mouseDown) return

        const moveDistanceX = e.clientX - this.xTouchStartAt
        const moveDistanceY = e.clientY - this.yTouchStartAt

        this.animateGalleryPosition(moveDistanceX, moveDistanceY)
    }

}
