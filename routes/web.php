<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\SendMailController;
use App\Http\Controllers\MarkdownController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/home', [HomeController::class, 'index'])->name('home.index');

    Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
    Route::post('/send-mail', [SendMailController::class, 'sendMail'])->name('sendMail');

    //Route::get('/markdown', [MarkdownController::class, 'index'])->name('markdown.index');
    //Route::post('/markdown/posts', [MarkdownController::class, 'store'])->name('markdown.store');

    Route::get('/markdown/editor', [MarkdownController::class, 'editor'])->name('markdown.editor');
    Route::get('/markdown/{id}', [MarkdownController::class, 'show'])->name('markdown.show');
    Route::get('/markdown', [MarkdownController::class, 'index'])->name('markdown.index');
    Route::post('/markdown', [MarkdownController::class, 'store'])->name('markdown.store');
      
});

require __DIR__.'/auth.php';
