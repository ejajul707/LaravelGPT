<?php

use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;


Route::view('/','chat');
Route::get('/chat',[ChatController::class,'chat'])->name('chat');