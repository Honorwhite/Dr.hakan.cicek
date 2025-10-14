<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Hata raporlamayı aç
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Form verilerini al
$data = json_decode(file_get_contents('php://input'), true);

// Gerekli alanları kontrol et
$required_fields = ['name', 'phone', 'email', 'treatment', 'preferred_date', 'preferred_time'];
$missing_fields = [];

foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        $missing_fields[] = $field;
    }
}

if (!empty($missing_fields)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Eksik alanlar: ' . implode(', ', $missing_fields)
    ]);
    exit;
}

// E-posta doğrulama
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Geçersiz e-posta adresi'
    ]);
    exit;
}

// Telefon numarası doğrulama
if (!preg_match('/^[0-9]{10,11}$/', preg_replace('/[^0-9]/', '', $data['phone']))) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Geçersiz telefon numarası'
    ]);
    exit;
}

try {
    // Veritabanı bağlantısı
    $db = new PDO('mysql:host=localhost;dbname=hakancicek_db;charset=utf8', 'hakancicek_user', 'hakancicek_password');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Randevu verilerini veritabanına kaydet
    $stmt = $db->prepare("INSERT INTO appointments (name, phone, email, treatment, preferred_date, preferred_time, symptoms, created_at) 
                         VALUES (:name, :phone, :email, :treatment, :preferred_date, :preferred_time, :symptoms, NOW())");
    
    $stmt->execute([
        ':name' => $data['name'],
        ':phone' => $data['phone'],
        ':email' => $data['email'],
        ':treatment' => $data['treatment'],
        ':preferred_date' => $data['preferred_date'],
        ':preferred_time' => $data['preferred_time'],
        ':symptoms' => $data['symptoms'] ?? ''
    ]);

    // Başarılı yanıt
    echo json_encode([
        'success' => true,
        'message' => 'Randevu talebiniz başarıyla alındı. En kısa sürede size dönüş yapacağız.'
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Veritabanı hatası: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Bir hata oluştu: ' . $e->getMessage()
    ]);
}
?> 