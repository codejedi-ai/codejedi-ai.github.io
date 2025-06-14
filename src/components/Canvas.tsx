import React, { useRef, useEffect, useState } from "react";
import { Circle } from "./Circle";
import { Bucket } from "./Bucket";
import { makeDraggable } from "./makeDraggable";


console.log("drag");

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [circles, setCircles] = useState<Circle[]>([]);
    const [buckets, setBuckets] = useState<Bucket[]>([]);
    const [activeCircle, setActiveCircle] = useState<Circle | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Initialize objects once
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Helper function for generating random values
        function random(min: number, max: number) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        // Create an array of circles
        const initialCircles: Circle[] = [];
        for (let i = 0; i < 5; i++) {
            initialCircles.push(
                new Circle(
                    random(0, canvas.width),
                    random(0, canvas.height),
                    random(32, 128)
                )
            );
        }
        setCircles(initialCircles);

        // Make circles draggable
        initialCircles.forEach((circle) => makeDraggable(circle, canvas));
    }, []);

    // Setup canvas and animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Draw function to continuously update the canvas
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw all buckets
            buckets.forEach((bucket) => bucket.draw(ctx));

            // Draw all circles
            circles.forEach((circle) => circle.draw(ctx));

            requestAnimationFrame(draw);
        };

        // Start the draw loop
        const animationId = requestAnimationFrame(draw);

        // Event handlers for dragging
        const handleMouseDown = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            for (let i = circles.length - 1; i >= 0; i--) {
                if (circles[i].hitTest(mouseX, mouseY)) {
                    setActiveCircle(circles[i]);
                    setIsDragging(true);
                    break;
                }
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setActiveCircle(null);
        };

        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mouseup", handleMouseUp);
        canvas.addEventListener("mouseleave", handleMouseUp);

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mouseup", handleMouseUp);
            canvas.removeEventListener("mouseleave", handleMouseUp);
        };
    }, [circles, buckets]);

    return (


            
            <div style={{ paddingTop: "60px" }}>
                <canvas
                    ref={canvasRef}
                    width={window.innerWidth}
                    height={600}
                    style={{
                        border: "1px solid #000",
                        display: "block",
                        margin: "0 auto",
                        background: "#f5f5f5",
                        cursor: isDragging ? "grabbing" : "pointer",
                    }}
                />
            </div>
    
    );
}