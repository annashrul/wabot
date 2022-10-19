<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class schedule_message extends Model
{
    use HasFactory;
    protected $table = 'schedule_message_table';
    public $timestamps = false;
}
