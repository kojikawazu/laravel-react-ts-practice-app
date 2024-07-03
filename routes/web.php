<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\SendMailController;
use App\Http\Controllers\MarkdownController;
use App\Http\Controllers\MarkdownLikeController;
use App\Http\Controllers\MarkdownReplyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TableColumnController;
use App\Http\Middleware\LogControllerActions;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [MarkdownController::class, 'index'])->name('markdown.index');
    Route::get('/home', [HomeController::class, 'index'])->name('home.index');

    Route::middleware([LogControllerActions::class])->group(function () {
        Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
        Route::post('/send-mail', [SendMailController::class, 'sendMail'])->name('sendMail');

        Route::get('/markdown/creator', [MarkdownController::class, 'creator'])->name('markdown.creator');
        Route::get('/markdown/editor/{id}', [MarkdownController::class, 'editor'])->name('markdown.editor');
        Route::get('/markdown/{id}', [MarkdownController::class, 'show'])->name('markdown.show');
        Route::get('/markdown', [MarkdownController::class, 'index'])->name('markdown.index');
        Route::post('/markdown', [MarkdownController::class, 'store'])->name('markdown.store');
        Route::post('/markdown/{id}', [MarkdownController::class, 'update'])->name('markdown.update');
        Route::delete('/markdown/{id}', [MarkdownController::class, 'destroy'])->name('markdown.destroy');

        Route::post('/markdown/{post}/like', [MarkdownLikeController::class, 'like'])->name('markdown.like');
        Route::delete('/markdown/{post}/unlike', [MarkdownLikeController::class, 'unlike'])->name('markdown.unlike');

        Route::post('/markdown/{postId}/reply', [MarkdownReplyController::class, 'store'])->name('markdown.reply.store');
        Route::put('/markdown/reply/{replyId}', [MarkdownReplyController::class, 'update'])->name('markdown.reply.update');
        Route::delete('/markdown/reply/{replyId}', [MarkdownReplyController::class, 'destroy'])->name('markdown.reply.destroy');

        Route::get('/admin/tables', [TableColumnController::class, 'index'])->name('admin.tables');
    });
});

require __DIR__.'/auth.php';
