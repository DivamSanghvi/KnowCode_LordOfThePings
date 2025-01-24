package com.study.cropsproject;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.util.AttributeSet;
import android.view.View;

public class OverlayView extends View {

    private Paint paint;
    private float left, top, right, bottom;

    public OverlayView(Context context) {
        super(context);
        init();
    }

    public OverlayView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public OverlayView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    private void init() {
        paint = new Paint();
        paint.setColor(0xFFFF0000); // Red color for bounding box
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(8);
    }

    public void drawBoundingBox(float left, float top, float right, float bottom, Paint paint) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.paint = paint;
        invalidate(); // Redraw the view with updated bounding box
    }

    public void clearCanvas() {
        this.left = this.top = this.right = this.bottom = 0;
        invalidate();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        if (left != 0 || top != 0 || right != 0 || bottom != 0) {
            canvas.drawRect(left, top, right, bottom, paint);
        }
    }
}
